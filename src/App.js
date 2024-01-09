import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colspan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  { "category": "Laptops", "price": "1600", "stocked": true, "name": "Macbook Pro M1" },
  { "category": "Laptops", "price": "900", "stocked": true, "name": "UltraSlim Notebook" },
  
  { "category": "Smartphones", "price": "800", "stocked": true, "name": "Google Pixel 7" },
  { "category": "Smartphones", "price": "600", "stocked": false, "name": "Luxury Platinum" },
  
  { "category": "Audio Devices", "price": "150", "stocked": true, "name": "Sony Walkman" },
  { "category": "Audio Devices", "price": "200", "stocked": true, "name": "Bose CQ35" },
  
  { "category": "Smart Home", "price": "120", "stocked": true, "name": "Smart Thermostat" },
  { "category": "Smart Home", "price": "50", "stocked": true, "name": "Smart Bulb" },
  
  { "category": "Gaming Consoles", "price": "400", "stocked": true, "name": "GameStation X" },
  { "category": "Gaming Consoles", "price": "200", "stocked": true, "name": "Nintendo Switch" }
];


export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
