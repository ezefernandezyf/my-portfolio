import { Link } from 'react-router-dom';

export const AboutPage = (): React.JSX.Element => {
  return (
    <section id="about" aria-labelledby="about-title" className="prose max-w-none">
      <h1 id="about-title" className="text-2xl font-semibold">
        Acerca de mí
      </h1>
      <p>
        Hola — soy Ezequiel, desarrollador front-end. Este es un placeholder para la
        sección "Acerca de mí". Aquí luego incluiré una breve biografía, skills relevantes, y enlaces a
        proyectos.
      </p>

      <p>
        Mientras tanto, podés ir a{' '}
        <Link to="/contact" className="link">
          Contacto
        </Link>{' '}
        para dejarme un mensaje.
      </p>
    </section>
  );
};
