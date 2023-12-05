import Image from '@components/ui/image';
import cn from 'classnames';
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import {IsEditable, onlyForBuilder} from "@components/config";
const data = {
  title: 'app-heading',
  description: 'app-description',
  appImage: "https://builder.smart-ui.pro/files/banner-4.jpg",
  appButtons: [
    {
      "slug": "/#",
      "image": {
        "appButton": "https://builder.smart-ui.pro/files/app-store.png",
        "imageAlt": ""
      },
      "altText": "button-app-store",
      "buttonWidth": "170",
      "buttonHeight": "56"
    },
    {
      "slug": "/#",
      "image": {
        "appButton": "https://builder.smart-ui.pro/files/play-store.png",
        "imageAlt": ""
      },
      "altText": "button-play-store",
      "buttonWidth": "170",
      "buttonHeight": "56"
    }
  ]
};

interface Props {
  className?: string;
  DownloadApps?: any
  title?: string
  description?: string
  appImage?: string
}

const DownloadApps: React.FC<Props> = ({ DownloadApps = data.appButtons,
                                         title = data.title,
                                         description = data.description,
                                         appImage = data.appImage,
                                         className = 'pt-1.5 md:pt-0' }) => {
  const { t } = useTranslation('common');

  console.log('DownloadAppsProps ', {DownloadApps, title, description, appImage, className})

  if (onlyForBuilder()) {
    return (
      <div data-component="DownloadApps" style={{margin: "0 0 15px 0"}}>
        <div data-props="DownloadApps">
          title:
          <p {...IsEditable({title: "textContent"})}>app-heading</p>
          <br/>

          description:
          <p {...IsEditable({description: "textContent"})}>app-description</p>
          <br/>

          appImage:
          <img {...IsEditable({appImage: "src", appImageAlt: "textContent"})}
               src="https://lavar.com.ua/image/cache/catalog/vafelni-kartynku/vk-1172-750x750-product_thumb.jpg"
               alt=""/>
          <br/>

          className:
          <p {...IsEditable({className: "textContent"})}>pt-1.5 md:pt-0</p>
        </div>
        <br/>
        <div data-repeater="DownloadApps" style={{borderBottom: "solid red 1px", margin: "0 0 15px 0"}}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div data-repeaterbtn="collapseElem" style={{cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#E5E7EB", fontSize: "16px", color: "#000"}}>
              Collapsed
            </div>

            <div data-repeaterbtn="removeElem" style={{cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#EF4444", fontSize: "16px", color: "#fff"}}>
              Remove app
            </div>
          </div>

          <div data-repeaterbody="DownloadApps" className={'active'}>
            <div{...IsEditable({slug: "textContent"})}>/#</div>
            <div{...IsEditable({altText: "textContent"})}>button-app-store</div>
            <img {...IsEditable({appButton: "src", imageAlt: "textContent"})}
                 src="https://lavar.com.ua/image/cache/catalog/vafelni-kartynku/vk-1172-750x750-product_thumb.jpg"
                 alt=""/>
            <div{...IsEditable({buttonWidth: "textContent"})}>170</div>
            <div{...IsEditable({buttonHeight: "textContent"})}>56</div>
          </div>
        </div>

        <div data-repeaterbtn="addElem" style={{cursor: "pointer", display: "inline-block", padding: "2px 15px", borderRadius: "9999px", background: "#2C752F", fontSize: "16px", color: "#fff"}}>
          Add app
        </div>
      </div>
    )
  }


  return (
    <div data-component="DownloadApps" className={cn('bg-skin-three overflow-hidden', className)}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-5 md:px-6 lg:px-16 xl:px-28 2xl:px-32 3xl:px-40 md:flex justify-between items-center">
        <div className="flex-shrink-0 mx-auto md:ms-0 lg:flex lg:items-center pb-5 pt-1.5 md:pt-4 max-w-[350px] md:max-w-[340px] lg:max-w-[485px] xl:max-w-[540px] 2xl:max-w-[690px] 3xl:ps-10">
          <div className="py-8 xl:py-10 2xl:py-14 text-center md:text-start">
            <h2 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-skin-base font-bold font-manrope -tracking-[0.2px] mb-3 lg:mb-4">
              {t(title)}
            </h2>
            <p className="text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-skin-base text-opacity-70 pb-5 lg:pb-7 pe-0 xl:pe-8 2xl:pe-20">
              {t(description)}
            </p>
            <div className="flex justify-center md:justify-start space-s-2 md:space-s-2.5 pt-0.5 px-7 sm:px-0">
              {DownloadApps?.map((item, i) => (
                <Link
                  key={i}
                  href={item.slug}
                  className="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80"
                >
                  <Image
                    src={item.image.appButton}
                    alt={t(item.image.altText)}
                    className="w-36 lg:w-44 xl:w-auto rounded-md"
                    width={item.buttonWidth}
                    height={item.buttonHeight}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-end ps-4 2xl:ps-0 md:max-w-[480px] lg:max-w-[540px] xl:max-w-auto -me-16 lg:-me-8 3xl:me-24">
          <Image
            src={appImage}
            alt={t('text-app-thumbnail')}
            width={597}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadApps;
