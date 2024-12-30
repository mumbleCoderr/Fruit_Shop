import "../stylesheets/Item.css";

const Item = ({ fruit }) => {
  return (
    <>
      <li>
        <div className="item-container">
          <div className="item-photo">
            <img src={fruit.img} alt={fruit.name} />
          </div>
          <div className="item-info">
            <h2>{fruit.name}</h2>
          </div>
        </div>
      </li>
    </>
  );
};

export default Item;
