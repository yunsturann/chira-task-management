// ** React Imports
import React, { Suspense } from "react";

// ** Custom Components
import Container from "@/components/shared/container";
import RecentBoards from "@/components/homepage/recent-boards";
import Loading from "@/components/shared/loading";

const HomePage = () => {
  return (
    <div>
      <Container
        paddingVertical
        className="flex flex-col gap-y-12 lg:gap-y-20 "
      >
        {/* Slogan */}
        <section className="p-16 bg-slogan-light dark:bg-slogan-dark bg-center bg-cover rounded-3xl">
          {/* Slogan */}
          <h1 className="text-3xl sm:text-5xl font-bold tracking-wider text-center text-neutral-600 dark:text-neutral-300 ">
            Empower Your <br /> Todo Management
          </h1>
        </section>
        {/* Recently  */}
        <Suspense fallback={<Loading />}>
          <RecentBoards />
        </Suspense>
      </Container>
    </div>
  );
};

export default HomePage;
