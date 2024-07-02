interface Props {
  header: string;
  title: string;
  text: string;
  class: string;
}

const Card = ({ header, title, text, class: className }: Props) => {
  return (
    <div className="col-4">
      <div
        className={`card text-bg-${className} mb-3`}
        style={{ width: "100%", height: "90%" }}
      >
        <div className="card-header">{header}</div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
