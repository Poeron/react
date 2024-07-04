import Card from "../components/Card";

const Home = () => {
  return (
    <>
      <div className="container">
        <br />
        <h3>Kiracı İşlemleri</h3>
        <br />
        <div className="row">
          <Card
            header="Kiracılar"
            title="Kiracıları Listele"
            text="Kiracıları listeleme formu burada yer alacak."
            class="info"
            path="/users"
          />
        </div>
        <h3>Daire İşlemleri</h3>
        <br />
        <div className="row">
          <Card
            header="Daireler"
            title="Daireleri Listele"
            text="Daireleri listeleme formu burada yer alacak."
            class="info"
            path="/apartments"
          />
        </div>
        <h3>Ekleme İşlemleri</h3>
        <br />
        <div className="row">
          <Card
            header="Fatura İşlemleri"
            title="Aidat ve Fatura Bilgileri Ekle"
            text="Aidat ve fatura bilgileri ekleme formu burada yer alacak."
            class="success"
            path="/addBill"
          />
        </div>
        <h3>Görüntüleme İşlemleri</h3>
        <br />
        <div className="row">
          <Card
            header="Ödemeler"
            title="Gelen Ödemeleri Görüntüle"
            text="Gelen ödemeleri görüntüleme formu burada yer alacak."
            class="secondary"
            path="/paidBills"
          />
          <Card
            header="Mesajlar"
            title="Gelen Mesajları Görüntüle"
            text="Gelen mesajları görüntüleme formu burada yer alacak."
            class="secondary"
            path="/messages"
          />
          <Card
            header="Borç listesi"
            title="Aylık Borç-Alacak Listesini Görüntüle"
            text="Aylık borç-alacak listesi görüntüleme formu burada yer alacak."
            class="secondary"
            path="/unpaidBills"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
