"""empty message

Revision ID: 031ec90fc611
Revises: f47171f72133
Create Date: 2024-11-24 10:37:56.763969

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '031ec90fc611'
down_revision = 'f47171f72133'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('total_score', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('highest_score', sa.Integer(), nullable=True))
        batch_op.drop_column('score')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('score', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_column('highest_score')
        batch_op.drop_column('total_score')

    # ### end Alembic commands ###