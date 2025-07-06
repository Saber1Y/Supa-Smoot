import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../config/SupabaseClient";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [error, setError] = useState(null);
  const [updateFormError, setUpdateErrorForm] = useState();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpdatedSmoothies = async () => {
      const { data, error } = await supabase
        .from("Smoothies")
        .select()
        .eq("id", id)
        .single();

      if (data) {
        console.log(data);
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }

      if (error) {
        setError("This does not exsist");
        console.log("error", error);
        navigate("/", { replace: true });
      }
    };

    fetchUpdatedSmoothies();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setUpdateErrorForm("Input type do not exisit");

      return;
    }

    const { data, error } = await supabase
      .from("Smoothies")
      .update([{ title, method, rating }])
      .eq("id", id)
      .select();

    if (error) {
      setUpdateErrorForm("Input type do not exisit");
    }

    if (data) {
      console.log(data)

      
      navigate("/");
      setError(null);
      setUpdateErrorForm(null);
    }
  };

  return (
    <div className="page update">
      <form onSubmit={handleUpdate}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">method: </label>
        <textarea
          type="text"
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">rating: </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update smoothie</button>

        {updateFormError && <p className="error">{updateFormError}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Update;
