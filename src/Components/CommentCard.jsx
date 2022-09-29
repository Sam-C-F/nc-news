import "./CommentCard.css";

export default function CommentCard({ comment }) {
  const dateStamp = (comment) => {
    const date = comment.created_at.slice(0, 10);
    return date.split("-").reverse().join("-");
  };

  return (
    <li className="single__comment">
      <p>{comment.body}</p>
      <p>
        ❤{comment.votes}❤&nbsp; &nbsp; {dateStamp(comment)} &nbsp; &nbsp;
        {comment.author}
      </p>
      <hr />
    </li>
  );
}
