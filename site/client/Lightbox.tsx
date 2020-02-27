import * as React from "react"
import * as ReactDOM from "react-dom"
import { useState, useRef } from "react"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons/faSearchPlus"
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons/faSearchMinus"
import { faCompress } from "@fortawesome/free-solid-svg-icons/faCompress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { LoadingIndicator } from "site/client/LoadingIndicator"

const Lightbox = ({
    children,
    containerNode
}: {
    children: any
    containerNode: Element | null
}) => {
    const close = () => {
        if (containerNode) {
            ReactDOM.unmountComponentAtNode(containerNode)
        }
    }
    const [isLoaded, setIsLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef} className="container">
            {!isLoaded && <LoadingIndicator />}
            <TransformWrapper doubleClick={{ mode: "reset" }}>
                {({ zoomIn, zoomOut, resetTransform }: any) => (
                    <>
                        <div className="content">
                            <TransformComponent>
                                {children(isLoaded, setIsLoaded)}
                            </TransformComponent>
                        </div>
                        <div className="tools">
                            {isLoaded && (
                                <>
                                    <button
                                        aria-label="Zoom in"
                                        onClick={zoomIn}
                                    >
                                        <FontAwesomeIcon icon={faSearchPlus} />
                                    </button>
                                    <button
                                        aria-label="Zoom out"
                                        onClick={zoomOut}
                                    >
                                        <FontAwesomeIcon icon={faSearchMinus} />
                                    </button>
                                    <button
                                        aria-label="Reset zoom"
                                        onClick={resetTransform}
                                    >
                                        <FontAwesomeIcon icon={faCompress} />
                                    </button>
                                </>
                            )}
                            <button
                                aria-label="Close"
                                onClick={close}
                                className="close"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </>
                )}
            </TransformWrapper>
        </div>
    )
}

const Image = ({
    src,
    isLoaded,
    setIsLoaded
}: {
    src: string
    isLoaded: boolean
    setIsLoaded: any
}) => {
    return (
        <>
            <img
                onLoad={() => {
                    setIsLoaded(true)
                }}
                src={src}
                style={{ opacity: !isLoaded ? 0 : 1, transition: "opacity 1s" }}
            />
        </>
    )
}

export const runLightbox = () => {
    let lightboxContainer = document.querySelector(".lightbox")
    if (!lightboxContainer) {
        lightboxContainer = document.createElement("div")
        lightboxContainer.classList.add("lightbox")
        document.body.appendChild(lightboxContainer)
    }
    Array.from(
        document.querySelectorAll<HTMLImageElement>(
            ".article-content .wp-block-column:nth-child(2) img, .article-content .wp-block-columns.is-style-side-by-side img"
        )
    ).forEach(img => {
        img.classList.add("lightbox-enabled")
        img.addEventListener("click", () => {
            const imgSrc = img.getAttribute("data-high-res-src")
                ? img.getAttribute("data-high-res-src")
                : img.src
            if (imgSrc) {
                ReactDOM.render(
                    <Lightbox containerNode={lightboxContainer}>
                        {(isLoaded: boolean, setIsLoaded: any) => (
                            <Image
                                src={imgSrc}
                                isLoaded={isLoaded}
                                setIsLoaded={setIsLoaded}
                            />
                        )}
                    </Lightbox>,
                    lightboxContainer
                )
            }
        })
    })
}
