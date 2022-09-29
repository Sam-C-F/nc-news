import "./CommentCard.css";

export default function CommentCard({ comment }) {
  return (
    <li className="single__comment">
      <p>{comment.body}</p>
      <p>
        ❤{comment.votes}❤&nbsp; &nbsp; {comment.created_at} &nbsp; &nbsp;
        {comment.author}
      </p>
      <hr />
    </li>
  );
}
