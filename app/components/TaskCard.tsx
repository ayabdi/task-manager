import React from "react";
import { motion } from "framer-motion";

const TaskCard = ({ task }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      exit={{ opacity: 0 }}
      layout
      className="task-card"
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </motion.div>
  );
};

export default TaskCard;
