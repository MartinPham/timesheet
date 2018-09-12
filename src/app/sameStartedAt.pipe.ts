import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'sameStartedAt',
    pure: false
})
export class SameStartedAtPipe implements PipeTransform {
    transform(items: any[], date: Date): any {
        if (!items || !date) {
            return items;
        }
        
        return items.filter(item => {
            return item.startedAt.getDate() == date.getDate() 
                && item.startedAt.getMonth() == date.getMonth() 
                && item.startedAt.getFullYear() == date.getFullYear();
        });
    }
}