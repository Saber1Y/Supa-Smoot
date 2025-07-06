import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";

const Home = () => {
  const [smoothy, setSmoothy] = useState(null);
  const [error, setError] = useState();


  useEffect(() => {
    const fetchSmooties = async() => {
      const { data, error } = await supabase
      .from("Supa Smot")
      .select()

      if (error) {
        setError("Could not fetch Smooties sorry");
        console.log("error", error);
        setSmoothy(null)
      }

      if (data) {
        setError(null)
        setSmoothy(data);
      }
    } 

    fetchSmooties(); //call function to dispplay
  }, [])
  
  return (
    <div className="page home">
      <h2>Home</h2>
    </div>
  );
};

export default Home;
