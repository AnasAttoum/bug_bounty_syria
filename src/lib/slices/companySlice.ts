import { createSlice } from "@reduxjs/toolkit";

export interface company {
    id?: number,
    image: string,
    name: string,
    link: string,
    description: string,
    people: string,
    type: string
}

const initialState: company[] = [
    { id: 0, image: '/images/companies/adobe.png', name: 'أدوبي', link: 'www.adobe.com', people: '150', type: 'حكومية', description: 'هي شركة برمجيات كمبيوتر أمريكية مقرها في كاليفورنيا. تقدم مجموعة واسعة من البرامج من أدوات تصميم الويب، وتعديل الصور وإنشاء التصاميم، إلى تحرير الفيديو/الصوت، وتطوير تطبيقات...' },
    { id: 1, image: '/images/companies/darrebni.png', name: 'دربني', link: 'www.darrebni.net', people: '150', type: 'حكومية', description: 'تقدم شركة دربني مسارات برمجية وتقنية تخصصية، لمساعدة الشباب والمهتمين بالمجال البرمجي على وضع خطواتهم الأولى في سوق العمل، وذلك بالتركيز على التدرّيب التفاعلي.' },
    { id: 2, image: '/images/companies/edrak.png', name: 'إدراك', link: 'www.edraak.org', people: '150', type: 'حكومية', description: 'إدراك هي منصة إلكترونية عربية للمساقات الجماعية والتي تحرص على بذل كافة الجهود والمساعي للمساهمة في وضع العالم العربي في المقدمة في مجال التربية والتعليم كونهما حجر الأساس لتطور وازدهار الشعوب.' },
    { id: 3, image: '/images/companies/mostaql.png', name: 'مستقل', link: 'www.mostaql.com', people: '150', type: 'حكومية', description: 'مستقل هو أكبر منصة للعمل الحر في العالم العربي يعمل على وصل الشركات وأصحاب المشاريع بأفضل المستقلين المحترفين لمساعدتهم على تنفيذ أفكارهم ومشاريعهم، وفي الوقت نفسه يتيح للمستقلين...' },
    { id: 4, image: '/images/companies/darrebni.png', name: 'دربني', link: 'www.darrebni.net', people: '150', type: 'حكومية', description: 'تقدم شركة دربني مسارات برمجية وتقنية تخصصية، لمساعدة الشباب والمهتمين بالمجال البرمجي على وضع خطواتهم الأولى في سوق العمل، وذلك بالتركيز على التدرّيب التفاعلي.' },
    { id: 5, image: '/images/companies/edrak.png', name: 'إدراك', link: 'www.edraak.org', people: '150', type: 'حكومية', description: 'إدراك هي منصة إلكترونية عربية للمساقات الجماعية والتي تحرص على بذل كافة الجهود والمساعي للمساهمة في وضع العالم العربي في المقدمة في مجال التربية والتعليم كونهما حجر الأساس لتطور وازدهار الشعوب.' },
    { id: 6, image: '/images/companies/mostaql.png', name: 'مستقل', link: 'www.mostaql.com', people: '150', type: 'حكومية', description: 'مستقل هو أكبر منصة للعمل الحر في العالم العربي يعمل على وصل الشركات وأصحاب المشاريع بأفضل المستقلين المحترفين لمساعدتهم على تنفيذ أفكارهم ومشاريعهم، وفي الوقت نفسه يتيح للمستقلين...' },
    { id: 7, image: '/images/companies/adobe.png', name: 'أدوبي', link: 'www.adobe.com', people: '150', type: 'حكومية', description: 'هي شركة برمجيات كمبيوتر أمريكية مقرها في كاليفورنيا. تقدم مجموعة واسعة من البرامج من أدوات تصميم الويب، وتعديل الصور وإنشاء التصاميم، إلى تحرير الفيديو/الصوت، وتطوير تطبيقات...' },
]

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {

    }
})

// export const { } = companySlice.actions

export default companySlice.reducer