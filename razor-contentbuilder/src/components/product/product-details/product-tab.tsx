import {useState} from 'react';
import {Tab} from '@headlessui/react';
import Heading from '@components/ui/heading';
import ProductReviewRating from './product-review-rating';
import {useTranslation} from "next-i18next";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function ProductDetailsTab() {
    const {t} = useTranslation('common');
    let [tabHeading] = useState({
        Product_Details: '',
        Review_Rating: '',
    });

    return (
        <div className="w-full  py-11 lg:py-14 xl:py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="block border-b border-skin-base space-s-8">
                    {Object.keys(tabHeading).map((item) => (
                        <Tab
                            key={item}
                            className={({selected}) =>
                                classNames(
                                    'relative inline-block transition-all text-18px lg:text-[20px] leading-5 text-skin-base focus:outline-none font-semibold pb-3 lg:pb-4 hover:text-skin-base',
                                    selected
                                        ? ' after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:start-0 after:bg-skin-primary'
                                        : ' text-gray-400'
                                )
                            }
                        >
                            {t(item)}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-6 lg:mt-9">
                    <Tab.Panel className="lg:flex">
                        <div
                            className="text-sm sm:text-15px text-skin-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
                            <p>
                                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                                sea takimata sanctus est Lorem ipsum dolor sit amet.
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam erat,
                                sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                                kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam
                                dolore dolores duo eirmod eos erat,
                                et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna
                                no rebum. sanctus sea sed takimata ut vero voluptua.
                                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.

                            </p>
                            <p>
                                Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
                                nisl ut aliquip ex ea commodo consequat.
                                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,
                                vel illum dolore eu feugiat nulla facilisis at vero
                                eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit
                                augue duis dolore te feugait nulla facilisi.

                            </p>
                            <p>
                                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,
                                vel illum dolore eu feugiat nulla facilisis.
                            </p>

                            <p>
                                Measures 63 x 30 cm/25 x 12 in
                            </p>
                        </div>

                    </Tab.Panel>
                    <Tab.Panel>
                        <ProductReviewRating/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
