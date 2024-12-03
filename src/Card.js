function Card ({id, title, tag, status}) {
  return (
    <div className="card">

      ID: {id}<br />
      Title: {title}<br />
      Tag: {tag}<br />
      Status: {status}<br />
    </div>
  );
}

export default Card;