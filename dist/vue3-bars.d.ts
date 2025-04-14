import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';

declare interface PointInput {
    value: number;
    title?: string | number;
}

export declare const VueBars: DefineComponent<ExtractPropTypes<    {
data: {
type: PropType<(number | PointInput)[]>;
required: true;
};
barWidth: {
type: NumberConstructor;
default: number;
};
rounding: {
type: NumberConstructor;
default: number;
};
growDuration: {
type: NumberConstructor;
default: number;
};
gradient: {
type: PropType<string[]>;
default: () => string[];
};
max: {
type: NumberConstructor;
default: number;
};
min: {
type: NumberConstructor;
default: number;
};
minBarHeight: {
type: NumberConstructor;
default: number;
};
labelData: {
type: PropType<(string | number)[]>;
default: () => never[];
};
labelRotate: {
type: NumberConstructor;
default: number;
};
labelColor: {
type: StringConstructor;
default: string;
};
labelSize: {
type: NumberConstructor;
default: number;
};
labelHeight: {
type: NumberConstructor;
default: number;
};
height: {
type: NumberConstructor;
};
width: {
type: NumberConstructor;
};
viewHeight: {
type: NumberConstructor;
default: number;
};
viewWidth: {
type: NumberConstructor;
default: number;
};
padding: {
type: NumberConstructor;
default: number;
};
svgStyle: {
type: ObjectConstructor;
default: () => {
display: string;
overflow: string;
};
};
}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {
data: {
type: PropType<(number | PointInput)[]>;
required: true;
};
barWidth: {
type: NumberConstructor;
default: number;
};
rounding: {
type: NumberConstructor;
default: number;
};
growDuration: {
type: NumberConstructor;
default: number;
};
gradient: {
type: PropType<string[]>;
default: () => string[];
};
max: {
type: NumberConstructor;
default: number;
};
min: {
type: NumberConstructor;
default: number;
};
minBarHeight: {
type: NumberConstructor;
default: number;
};
labelData: {
type: PropType<(string | number)[]>;
default: () => never[];
};
labelRotate: {
type: NumberConstructor;
default: number;
};
labelColor: {
type: StringConstructor;
default: string;
};
labelSize: {
type: NumberConstructor;
default: number;
};
labelHeight: {
type: NumberConstructor;
default: number;
};
height: {
type: NumberConstructor;
};
width: {
type: NumberConstructor;
};
viewHeight: {
type: NumberConstructor;
default: number;
};
viewWidth: {
type: NumberConstructor;
default: number;
};
padding: {
type: NumberConstructor;
default: number;
};
svgStyle: {
type: ObjectConstructor;
default: () => {
display: string;
overflow: string;
};
};
}>> & Readonly<{}>, {
minBarHeight: number;
max: number;
min: number;
gradient: string[];
growDuration: number;
barWidth: number;
padding: number;
rounding: number;
labelData: (string | number)[];
labelRotate: number;
labelColor: string;
labelSize: number;
labelHeight: number;
viewHeight: number;
viewWidth: number;
svgStyle: Record<string, any>;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export { }
