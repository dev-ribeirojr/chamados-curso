import './modal.css';

import { FiX } from 'react-icons/fi';

export default function Modal({ detail, handleClose }) {
  return (
    <section className="modal">
      <section className='container'>
        <button className='close' onClick={handleClose}>
          <FiX size={25} color='#FFF' />
          Voltar
        </button>

        <section>
          <h2>Detalhes do chamado</h2>
          <section className='row'>
            <span>
              Clinte: <i>{detail.cliente}</i>
            </span>
          </section>
          <section className='row'>
            <span>
              Assunto: <i>{detail.assunto}</i>
            </span>
            <span>
              Cadastrado em: <i>{detail.createdFormat}</i>
            </span>
          </section>
          <section className='row' >
            <span>
              Status:
              <i
                className='status-badge'
                style={{
                  color: "#FFF",
                  backgroundColor:
                    detail.status === 'Aberto' ? "#5cb85c" : "#999"
                }}>
                {detail.status}
              </i>
            </span>
          </section>

          {detail.complemento !== '' && (
            <>
              <h3>Complemento</h3>
              <p>
                {detail.complemento}
              </p>
            </>
          )}
        </section>
      </section>
    </section>
  )
}