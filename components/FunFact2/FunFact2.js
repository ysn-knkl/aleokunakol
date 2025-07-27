import React from 'react'

const FunFact2 = (props) => {

    const funFact = [
        {
            title: '95',
            subTitle: 'Cases Won',
            Symbol: '%',
        },
        {
            title: '863',
            subTitle: 'Trusted Client',
            Symbol: '+',
        },
        {
            title: '124',
            subTitle: 'Dedicated Lawyer',
            Symbol: '+',
        },
        {
            title: '25',
            subTitle: 'Case Dismissed',
            Symbol: '%',
        },


    ]


    return (

        <section className="relative  bg-center bg-cover bg-no-repeat bg-fixed pt-[100px] pb-[95px] z-10 
        before:content-[''] before:bg-[rgba(21,26,48,0.9)] before:w-full before:h-full before:absolute before:left-0 before:-z-10 before:top-0"  style={{ backgroundImage: `url(${'/images/contact/1.jpg'})` }}>
            <div className="wraper">
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-12 sm:col-span-12">
                        <div className="counter-grids relative overflow-hidden">
                            {funFact.map((funfact, fitem) => (
                                <div className="w-[24.33%] md:w-[48.33%] float-left pt-[40px] pb-[40px] mr-[5px] bg-[#c0b59633] mb-[5px] text-center sm:flex-none col:w-full" key={fitem}>
                                    <div>
                                        <h2 className=" text-[50px] sm:text-[30px] font-bold text-white ">{funfact.title}{funfact.Symbol}</h2>
                                    </div>
                                    <p className=" text-[18px] fonts-normal pt-[10px] text-[#c0b596]">{funfact.subTitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <span id="counter" className='d-none' />
        </section>
    )
}

export default FunFact2;