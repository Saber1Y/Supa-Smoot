import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";
import SmoothyCard from "../components/SmoothyCard";

const Home = () => {
  const [smoothies, setSmoothies] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("Smoothies").select();

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
  }, []);

   const handleDelete = (id) => {
    setSmoothies(prev => {
      return prev.filter(smoothie => smoothie.id !== id)
    })
  }


  return (
    <div className="page home">
      {error && <p>{error}</p>}

      {smoothies && (
        <div className="smoothies">
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
