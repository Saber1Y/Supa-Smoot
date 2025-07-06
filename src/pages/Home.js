import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";

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

  return (
    <div className="page home">
      {error && <p>{error}</p>}

      {smoothies && (
        <div>
          {smoothies.map((smoothie) => (
            <p key={smoothie.id}>{smoothie.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
