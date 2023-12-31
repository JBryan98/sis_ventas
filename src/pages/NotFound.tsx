import { Link, useRouteError } from "react-router-dom";

export const NotFound = (): JSX.Element => {
  const error = useRouteError();

  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <p>{error.statusText || error.message}</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};
