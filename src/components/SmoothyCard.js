import React from "react";
import { Link } from "react-router-dom";
import supabase from "../config/SupabaseClient";

const SmoothyCard = ({ smoothie, onDelete }) => {

  const handleDelete = async () => {
    const { data } = await supabase
      .from("Smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (data) {
      console.log(data);
      onDelete(smoothie.id)
    }
  };

  return (
    <div className="smoothie-card">
      <h2>{smoothie.title}</h2>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <button className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </button>
    </div>
  );
};

export default SmoothyCard;
