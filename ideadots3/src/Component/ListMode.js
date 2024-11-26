import Draggable from "react-draggable";

export default function ListMode({ spheresList }) {
  return (
    <Draggable>
      <div
        className="card p-3"
        style={{
          width: "54vh",
          height: "500px",
          overflowY: "scroll",
          outlineWidth: "1.5em",
          outlineColor: "black",
        }}
      >
        <div>
          <ul className="list-group list-group-flush">
            {spheresList.map((s) => (
              <div>{s.title}</div>
            ))}
          </ul>
        </div>
      </div>
    </Draggable>
  );
}
