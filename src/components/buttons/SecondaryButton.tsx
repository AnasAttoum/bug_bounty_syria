import { Button } from "@mantine/core";

export default function SecondaryButton({title}:{title:string}) {
    return (
        <Button variant="outline" color="primary.0">{title}</Button>
    )
}
