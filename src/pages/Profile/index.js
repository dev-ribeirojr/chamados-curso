import { useContext, useState } from "react";
import './profile.css';

import Header from "../../components/Header";
import Title from "../../components/Title";

import { FiSettings, FiUpload } from 'react-icons/fi';
import { AuthContext } from "../../contexts/auth";
import avatar from '../../assets/avatar.png';

import { db, storage } from '../../services/firebaseConection';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Profile() {

  const { user, setUser, storageUser, logout } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imgAvatar, setImgAvatar] = useState(null);

  const [nome, setNome] = useState(user && user.nome);

  function handleFile(e) {
    if (e.target.files[0]) {
      const img = e.target.files[0];

      if (img.type === 'image/jpeg' || img.type === 'image/png') {
        setImgAvatar(img);
        setAvatarUrl(URL.createObjectURL(img))
      } else {
        alert("envie uma imagen PNG ou JPEG")
        setImgAvatar(null);
        return;
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;

    const uploadRef = ref(storage, `imagens/${currentUid}/${imgAvatar.name}`)
    const uploadTask = uploadBytes(uploadRef, imgAvatar)
      .then((snapshot) => {

        getDownloadURL(snapshot.ref).then(async (downloadUrl) => {
          let urlFoto = downloadUrl;

          const docRef = doc(db, 'users', user.uid);
          await updateDoc(docRef, {
            avatarUrl: urlFoto,
            nome: nome,
          })
            .then(() => {
              let data = {
                ...user,
                nome: nome,
                avatarUrl: urlFoto,
              }
              setUser(data);
              storageUser(data);
              alert('perfil atualizado com sucesso!')
            })
        })
      })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (imgAvatar === null && nome !== '') {
      //atualizar apenas nome
      const dorRef = doc(db, 'users', user.uid);
      await updateDoc(dorRef, {
        nome: nome,
      })
        .then(() => {
          let data = {
            ...user,
            nome: nome
          }
          setUser(data);
          storageUser(data);
          alert('Nome atualizado com sucesso!!')
        })
        .catch(() => {
          alert('Erro ao atualizar nome')
        })
    } else if (nome !== '' && imgAvatar !== null) {
      // atualizar nome e foto
      handleUpload();
    }
  }

  return (
    <section>
      <Header />
      <section className="content">
        <Title titulo="Minha Conta">
          <FiSettings size={25} />

        </Title>

        <section className="container">
          <form className="form-perfil" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              {avatarUrl === null ? (
                <img src={avatar} alt='Foto de Perfil' width={200} heigth={200} />
              ) : (
                <img src={avatarUrl} alt='Foto de Perfil' width={200} heigth={200} />
              )}
            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Email</label>
            <input type="text" value={user.email} disabled={true} />

            <button type="submit"> Salvar</button>
          </form>
        </section>
        <section className="container">
          <button className="logout-btn" onClick={() => logout()}> Sair</button>
        </section>
      </section>
    </section>
  )
}