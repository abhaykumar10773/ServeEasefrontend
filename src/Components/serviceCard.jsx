
import { Link } from 'react-router-dom';


  export default function ServiceCard({ service }) {
    


    return (
      <div className='container'>
      <div className="card text-center m-3 mx-3 rounded" style={{ width: '24rem' }}>
        <img src={service.image} className="card-img-top h-28" alt={service.title} />
        <div className="card-body">
          <h1 className="card-title fs-3 fw-bold">{service.title}</h1>
          <p className="card-text">{service.description}</p>
          
          <Link to={`/Service/${service.path}`} className="btn btn-outline-success mt-3">
           Book now
        </Link>
        </div>
      </div>
      
      
</div>
    );
  }
 