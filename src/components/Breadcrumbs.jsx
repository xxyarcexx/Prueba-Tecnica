import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="text-sm breadcrumbs mb-4">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        {pathnames.map((name, index) => (
          <li key={index}>
            <Link to={`/${pathnames.slice(0, index + 1).join('/')}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;