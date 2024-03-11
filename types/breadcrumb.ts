export interface IBreadcrumbItem {
    label: string
    link: string | object
    isEnabled?: boolean;
}
export interface IBreadcrumb {
    items: IBreadcrumbItem[]
}