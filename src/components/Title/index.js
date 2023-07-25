import './title.css';

export default function Title({ children, titulo }) {

  return (
    <section className='title'>
      {children}
      <span>{titulo}</span>
    </section>
  )
}