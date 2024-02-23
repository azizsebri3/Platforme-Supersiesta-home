import Card from "./card";
//import products from "./products";
import "../output.css";
import ProductCard from "./productCard";
import matlas from "../assets/matlas.png";

const Home = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row bg-white items-center">
        <div className="flex justify-center  m-auto ">
          <div className="max-w-full">
            <img
              src="https://cdn.youcan.shop/stores/ef64d91f474f5e5fc1392fc960e130b1/others/uSi9TKvIirqAnUvhOgSnGI6y28NPggMOkBRmemDj.jpeg"
              alt="img-soc"
              className="w-full mt-12 border rounded-2xl  "
            />
          </div>
        </div>
      </div>

      <h1 className=" flex items-center justify-center font-sans mb-6 text-3xl text-wrap text-bold ">
        Nouvelle Collection
      </h1>
      <div className="flex  justify-center flex-wrap mx-20  ">
        <ProductCard img={matlas} desc={"Test"} price={350} />
        <ProductCard img={matlas} desc={"Prix semh"} price={350} />
        <ProductCard img={matlas} desc={"Prix semh"} price={350} />
        <ProductCard img={matlas} desc={"Prix semh"} price={350} />
        <ProductCard img={matlas} desc={"Prix semh"} price={350} />
        <ProductCard img={matlas} desc={"Prix semh"} price={350} />
        <ProductCard img={matlas} desc={"Prix semh"} price={350} />
      </div>
    </>
  );
};

export default Home;
