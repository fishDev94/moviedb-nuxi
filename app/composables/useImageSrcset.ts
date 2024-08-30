export default function useImageSrcset(url: string): string {
    const ws = [["w300", "300w"], ["w500", "500w"], ["w1280", "1280w"]]

    const srcset = ws.map(([w, d]) => {

        return `${useImageUrl(url, { w })} ${d}`;
    })

return srcset.join(', ');
}
