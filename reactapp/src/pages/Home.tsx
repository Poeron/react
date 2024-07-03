import Card from "../components/Card";

const Home = () => {
  return (
    <>
      <div className="container">
        <br />
        <h3>Ekleme İşlemleri</h3>
        <br />
        <div className="row">
          <Card
            header="Daire Ekle"
            title="Daire Ekleme Formu"
            text="Daire ekleme formu burada yer alacak."
            class="success"
            path="/addApartment"
          />
          <Card
            header="Kullanıcı Ekle"
            title="Kullanıcı Ekleme Formu"
            text="Kullanıcı ekleme formu burada yer alacak."
            class="success"
            path="/addUser"
          />
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
            path="#"
          />
          <Card
            header="Mesajlar"
            title="Gelen Mesajları Görüntüle"
            text="Gelen mesajları görüntüleme formu burada yer alacak."
            class="secondary"
            path="#"
          />
          <Card
            header="Borç listesi"
            title="Aylık Borç-Alacak Listesini Görüntüle"
            text="Aylık borç-alacak listesi görüntüleme formu burada yer alacak."
            class="secondary"
            path="#"
          />
        </div>
        <h3>Kullanıcı İşlemleri</h3>
        <br />
        <div className="row">
          <Card
            header="Kullanıcılar"
            title="Kullanıcıları Listele"
            text="Kullanıcıları listeleme formu burada yer alacak."
            class="info"
            path="#"
          />
          <Card
            header="Kullanıcılar"
            title="Kullanıcıları Düzenle"
            text="Kullanıcıları düzenleme formu burada yer alacak."
            class="warning"
            path="#"
          />
          <Card
            header="Kullanıcılar"
            title="Kullanıcıları Sil"
            text="Kullanıcıları silme formu burada yer alacak."
            class="danger"
            path="#"
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
            path="#"
          />
          <Card
            header="Daireler"
            title="Daireleri Düzenle"
            text="Daireleri düzenleme formu burada yer alacak."
            class="warning"
            path="#"
          />
          <Card
            header="Daireler"
            title="Daireleri Sil"
            text="Daireleri silme formu burada yer alacak."
            class="danger"
            path="#"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
