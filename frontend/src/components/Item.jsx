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
            <p>{fruit.name}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default Item;
