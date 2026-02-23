import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameDetailAboutProps {
  description: string;
}

export function GameDetailAbout({ description }: GameDetailAboutProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">About</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed prose-p:text-muted-foreground prose-headings:font-semibold"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>
    </Card>
  );
}
