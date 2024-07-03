import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  header: string;
  title: string;
  text: string;
  class: string;
  path: string; // Add path prop to specify the navigation path
}

const Card: React.FC<Props> = ({
  header,
  title,
  text,
  class: className,
  path,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="col-4">
      <div
        className={`card text-bg-${className} mb-3`}
        style={{ width: "100%", height: "90%", cursor: "pointer" }}
        onClick={handleClick}
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
