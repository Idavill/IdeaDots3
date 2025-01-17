export default function Button({ onClick, text }) {
  return (
    <button type="button" onClick={onClick} class="btn btn-light headerButton">
      {text}
    </button>
  );
}
