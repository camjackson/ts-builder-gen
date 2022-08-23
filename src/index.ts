import {
  ts,
  Project,
  SyntaxKind,
  VariableStatement,
  VariableStatementStructure,
} from 'ts-morph';
import { User } from './types';

const project = new Project();

const sourceFile = project.addSourceFileAtPath('src/types.ts');

const types = sourceFile.getTypeAliases();

// console.log(types[0].getName());

types.forEach((theType) => {
  // console.log(theType.getName());
  const fields = theType.getChildrenOfKind(SyntaxKind.Identifier);
  theType
    .getType()
    .getProperties()
    .forEach((property) => {
      // console.log(property.getName());
      // console.log(property.getDeclaredType());
    });
  // console.log();
  fields.forEach((field) => {
    // console.log(field);
  });

  theType.getChildren().forEach((child) => {
    // console.log(child.getKindName());
  });
});

const createBuilder = (typeName: string): ts.VariableStatement => {
  const functionName = `build${typeName}`;

  return ts.createVariableStatement(
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createVariableDeclarationList(
      [
        ts.createVariableDeclaration(
          ts.createIdentifier('buildUser'),
          undefined,
          ts.createArrowFunction(
            undefined,
            undefined,
            [
              ts.createParameter(
                undefined,
                undefined,
                undefined,
                ts.createIdentifier('overrides'),
                undefined,
                ts.createTypeReferenceNode(ts.createIdentifier('Partial'), [
                  ts.createTypeReferenceNode(
                    ts.createIdentifier('User'),
                    undefined,
                  ),
                ]),
                ts.createObjectLiteral([], false),
              ),
            ],
            undefined,
            ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            ts.createParen(
              ts.createObjectLiteral(
                [
                  ts.createPropertyAssignment(
                    ts.createIdentifier('name'),
                    ts.createStringLiteral(''),
                  ),
                  ts.createPropertyAssignment(
                    ts.createIdentifier('age'),
                    ts.createNumericLiteral('0'),
                  ),
                  ts.createSpreadAssignment(ts.createIdentifier('overrides')),
                ],
                true,
              ),
            ),
          ),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
};

const outputFile = project.addSourceFileAtPath('src/output.ts');
const builderFunc: ts.VariableStatement = createBuilder('User');

outputFile.addVariableStatement(
  (builderFunc as any) as VariableStatementStructure,
);

console.log(builderFunc);

// outputFile.addVariableStatement(builderFunc);

// console.log(builderFunc);

// console.log(createBuilder('User').getText());

// ts.createVariableStatement(
//   [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
//   ts.createVariableDeclarationList(
//     [
//       ts.createVariableDeclaration(
//         ts.createIdentifier('buildUser'),
//         undefined,
//         ts.createArrowFunction(
//           undefined,
//           undefined,
//           [
//             ts.createParameter(
//               undefined,
//               undefined,
//               undefined,
//               ts.createIdentifier('overrides'),
//               undefined,
//               ts.createTypeReferenceNode(ts.createIdentifier('Partial'), [
//                 ts.createTypeReferenceNode(
//                   ts.createIdentifier('User'),
//                   undefined,
//                 ),
//               ]),
//               ts.createObjectLiteral([], false),
//             ),
//           ],
//           undefined,
//           ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
//           ts.createParen(
//             ts.createObjectLiteral(
//               [
//                 ts.createPropertyAssignment(
//                   ts.createIdentifier('name'),
//                   ts.createStringLiteral(''),
//                 ),
//                 ts.createPropertyAssignment(
//                   ts.createIdentifier('age'),
//                   ts.createNumericLiteral('0'),
//                 ),
//                 ts.createSpreadAssignment(ts.createIdentifier('overrides')),
//               ],
//               true,
//             ),
//           ),
//         ),
//       ),
//     ],
//     ts.NodeFlags.Const,
//   ),
// );
