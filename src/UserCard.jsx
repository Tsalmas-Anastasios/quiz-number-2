import "./UserCard.css";

export default function UserCard(props) {
    
    return (
        <article className="main-container__card">
            <p>Name: {props.user.name}</p>
            <p>Username: {props.user.username}</p>
            <p>Email: {props.user.email}</p>
            <p>City: {props.user.address.city}</p>
            <p>Zipcode: {props.user.address.zipcode}</p>
            <p>Phone: {props.user.phone}</p>
        </article>
    );
}