import { Button } from "./ui/button";

function LoaderButton() {
  return (
    <Button className="flex gap-1" type="submit" disabled>
      <div className={`mr-2 h-4 w-4  animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.2s_linear_infinite]`}></div>
      <div>Please wait</div>
    </Button>
  );
}

export default LoaderButton;
