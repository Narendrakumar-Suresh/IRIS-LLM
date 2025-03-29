import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Response() {
  return (
    <Alert
      variant={"default"}
      className="max-w-80 p-2 m-8 rounded-2xl bg-blue-200"
    >
      {/* <AlertTitle className="text-xs text-slate-600">You</AlertTitle> */}
      <AlertDescription className="text-xl text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum labore
        doloribus molestias in possimus, inventore rem quidem quae cumque
        mollitia veritatis eum quam iusto repellat consectetur natus dignissimos
        quaerat animi.
      </AlertDescription>
    </Alert>
  );
}
