import Card from "../components/Card";
import resim1 from "../assets/images/resim1.jpg";
import resim2 from "../assets/images/resim2.jpg";
import resim3 from "../assets/images/resim3.jpg";

const Home = () => {
  return (
    <div className="row">
      <Card
        imageSrc={resim1}
        title="resim1"
        text="lorem ipsum dolor sit amet"
      />
      <Card
        imageSrc={resim2}
        title="resim2"
        text="lorem ipsum dolor sit amet"
      />
      <Card
        imageSrc={resim3}
        title="resim3"
        text="lorem ipsum dolor sit amet"
      />
    </div>
  );
};

export default Home;
