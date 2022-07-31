import { Link } from 'react-router-dom';
import './pagenotfound.css';

function PageNotFound() {
  return (
    <div className='not-found-page'>
      <img id='notfoundimg' src='https://external-preview.redd.it/KLRz-fRPWE1ssPHQheK-0ont5pD6wr_PQWDZNCUAw9U.jpg?auto=webp&s=851ba8c8257dc7b414c842220a751c137c248bde' alt="loading 404" />
      <Link>Heres a link</Link>
    </div>
  );
}

export default PageNotFound
