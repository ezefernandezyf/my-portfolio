import { Link } from 'react-router-dom';

export const ContactPage = (): React.JSX.Element => {
  return (
    <section id="contact" aria-labelledby="contact-title" className="prose max-w-none">
      <h1 id="contact-title" className="text-2xl font-semibold">
        Contacto
      </h1>
      <p>
        Este es un placeholder para la página de contacto. Aquí pondré un formulario de contacto o
        instrucciones para comunicarse (email, LinkedIn).
      </p>

      <p>
        Mientras tanto, podés volver al{' '}
        <Link to="/about" className="link">
          perfil
        </Link>
        .
      </p>
    </section>
  );
};
