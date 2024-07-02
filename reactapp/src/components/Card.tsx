interface Props {
  imageSrc: string;
  title: string;
  text: string;
}

const Card = ({ imageSrc, title, text }: Props) => {
  return (
    <>
      <div className="col-4">
        <div className="card">
          <img src={imageSrc} className="card-img-top " alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
