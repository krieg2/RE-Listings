import './Listing.css';

const Listing = ({ id, source, address, city, state, zip,
    price, bedrooms, bathrooms, sqft, latitude, longitude,
    listedDate, status, description }) => {

    return (<div className="listing">
        <div><label>id:</label> <span>{id}</span></div>
        <div><label>source:</label> <span>{source}</span></div>
        <div><label>address:</label> <span>{address}</span></div>
        <div><label>city:</label> <span>{city}</span></div>
        <div><label>state:</label> <span>{state}</span></div>
        <div><label>zip:</label> <span>{zip}</span></div>
        <div><label>price:</label> <span>{price}</span></div>
        <div><label>bedrooms:</label> <span>{bedrooms}</span></div>
        <div><label>bathrooms:</label> <span>{bathrooms}</span></div>
        <div><label>sqft:</label> <span>{sqft}</span></div>
        <div><label>latitude:</label> <span>{latitude}</span></div>
        <div><label>longitude:</label> <span>{longitude}</span></div>
        <div><label>listedDate:</label> <span>{listedDate}</span></div>
        <div><label>status:</label> <span>{status}</span></div>
        <div><label>description:</label> <span>{description}</span></div>
    </div>);
};

export default Listing;