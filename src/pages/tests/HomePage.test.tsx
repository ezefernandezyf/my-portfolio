import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../components", () => {
  return {
    ProjectCarousel: (props: React.JSX.Element) => (
      <div data-testid="carousel-mock" {...props}>
        Carousel Mock
      </div>
    ),
  };
});

import { HomePage } from "../HomePage";

describe("HomePage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renderiza el hero, links principales y la preview de proyecto", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /ezequiel fernández/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /ir a acerca/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver proyectos/i })).toBeInTheDocument();

    const cvLinks = screen.getAllByRole("link", { name: /descargar cv/i });
    expect(cvLinks.length).toBeGreaterThanOrEqual(1);
    expect(cvLinks[0]).toHaveAttribute("href", "/CV.pdf");

    expect(screen.getByText(/stack destacado/i)).toBeInTheDocument();
    expect(screen.getAllByText(/react/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/typescript/i).length).toBeGreaterThanOrEqual(1);

    expect(screen.getByTestId("carousel-mock")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /cinelab/i })).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /repositorio de cinelab/i }),
    ).toHaveAttribute("href", "https://github.com/ezefernandezyf/cinelab-react");

    expect(screen.getByRole("link", { name: /abrir demo/i })).toHaveAttribute(
      "href",
      "https://cinelab-movies.vercel.app",
    );

    expect(screen.getByRole("link", { name: /ver todos/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contactar/i })).toBeInTheDocument();
  });
});