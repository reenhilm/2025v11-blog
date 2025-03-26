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
    <Link href={`/posts/${id}`} className="no-underline">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mx-1 line-clamp-2">{body}</p>
          <h4 className="cursor-pointer underline text-blue-700 mt-2 ">
            read more
          </h4>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between mx-4 my-2">
            <div className="flex justify-between gap-1">
              {tags.map((tag, index) => (
                <Link
                  className="hover:underline primarycolored theme-set_url-link mr-2"
                  key={index}
                  href={`/posts/tag/${tag}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="flex gap-3 ml-5">
              <div className="flex flex-col items-center theme-set-inherit_all">
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
    </Link>
  );
}
