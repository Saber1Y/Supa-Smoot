import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";
import SmoothyCard from "../components/SmoothyCard";

const Home = () => {
  const [smoothies, setSmoothies] = useState(null);
  const [error, setError] = useState();
  const [order, setOrder] = useState("created_at");

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("Smoothies")
        .select()
        .order(order, { ascending: false })
        .select();

      if (error) {
        setError("Could not fetch Smoothies. Sorry!");
        setSmoothies(null);
        console.log("error", error);
      }

      if (data) {
        setSmoothies(data);
        setError(null);
        console.log("Fetched data", data);
      }
    };

    fetchSmoothies();
  }, [order]);

  const handleDelete = (id) => {
    setSmoothies((prev) => {
      return prev.filter((smoothie) => smoothie.id !== id);
    });
  };

  return (
    <div className="page home">
      {error && <p>{error}</p>}

      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by: </p>
            <button onClick={() => setOrder("created_at")}>Time Created</button>
            <button onClick={() => setOrder("rating")}>Rating</button>
            <button onClick={() => setOrder("title")}>Title</button>
            {order}
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothyCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
