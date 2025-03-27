import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reactions } from "@/interfaces/posts";

export default function PostTextAsCard({
  id,
  title,
  body,
  tags,
  reactions,
}: {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
}) {
  return (
    <main>
    
      <Card>
      <Link href={`/posts/${id}`} className="no-underline">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mx-1 line-clamp-2">{body}</p>
          <h4 className="hover:underline cursor-pointer mr-2 mt-2 float-right theme-accent-colored">
            read more
          </h4>
        </CardContent>
        </Link>
        <CardFooter>
          <div className="flex justify-between mx-4 my-2">
            <div className="flex justify-between gap-1">
              {tags.map((tag, index) => (
                <Link
                  className="hover:underline mr-2 theme-accent-colored"
                  key={index}
                  href={`/posts/tag/${tag}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="flex gap-3 ml-5">
              <div className="flex flex-col items-center theme-children-inherit">
                <figure>
                  🙂
                  <figcaption className="sr-only">Smiling smiley</figcaption>
                </figure>
                <p>{reactions.likes}</p>
              </div>

              <div className="flex flex-col items-center">
                <figure>
                  🙁
                  <figcaption className="sr-only">Unhappy smiley</figcaption>
                </figure>
                <p>{reactions.dislikes}</p>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    
    </main>
  );
}
