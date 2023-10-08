import axios from "axios";

export default (sessionId) => ({
  trigger: (title) =>
    axios.put(`http://localhost:3000/session/${sessionId}/?title=${title}`, {})

});
