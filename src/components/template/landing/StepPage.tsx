"use client";
function StepPage() {
  return (
    <>
      <div className="custom-gradiant w-full h-max flex flex-col items-center justify-center  p-10">
        <h1 className="text-8xl">Facil Y Rapido</h1>
        <h3 className="text-4xl mt-14">Paso a paso</h3>
        <div className="container flex gap-10 items-center justify-center mt-20">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>
      <style jsx>
        {`
          .box {
            background-color: black;
            width: 15rem; /* equivalente a w-40 */
            height: 20rem; /* equivalente a h-80 */
          }
          .custom-gradiant {
            background: rgb(31, 41, 55);
            background: linear-gradient(
              0deg,
              rgba(31, 41, 55, 1) 0%,
              rgba(31, 41, 55, 0.9626225490196079) 100%
            );
          }
        `}
      </style>
    </>
  );
}

export default StepPage;
