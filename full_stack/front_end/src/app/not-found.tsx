import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="font-serif text-2xl font-bold lg:text-3xl">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-muted-foreground">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
